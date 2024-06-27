const functions = require('firebase-functions')
const express = require('express')
const { AuthorizationCode } = require('simple-oauth2')
const randomstring = require('randomstring')

const oauth = functions.config().oauth
const oauth_provider = oauth.provider || 'github'

function getScript(status, content) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:${oauth_provider}:${status}:${JSON.stringify(
            content
          )}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:${oauth_provider}", "*");
    </script>
  `
}

const oauth2 = new AuthorizationCode({
  client: {
    id: oauth.client_id,
    secret: oauth.client_secret
  },
  auth: {
    tokenHost: oauth.git_hostname || 'https://github.com',
    tokenPath: oauth.token_path || '/login/oauth/access_token',
    authorizePath: oauth.authorize_path || '/login/oauth/authorize',
  }
})

const oauthApp = express()

oauthApp.get('/auth', (req, res) => {
  const authorizationUri = oauth2.authorizeURL({
    // redirect_uri: oauth.redirect_url,
    redirect_uri: "https://us-central1-angular-de.cloudfunctions.net/oauth/callback",
    scope: oauth.scopes || 'repo,user',
    state: randomstring.generate(32)
  })

  res.redirect(authorizationUri)
})

oauthApp.get('/callback', async (req, res) => {
  var options = {
    code: req.query.code
  }

  if (oauth_provider === 'gitlab') {
    options.client_id = oauth.client_id
    options.client_secret = oauth.client_secret
    options.grant_type = 'authorization_code'
    options.redirect_uri = oauth.redirect_url
  }

  try {
    const result = await oauth2.getToken(options)

    return res.send(getScript('success', {
      token: result.token.access_token,
      provider: oauth_provider
    }))
  }
  catch (error) {
    console.error('Access Token Error', error.message)
    res.send(getScript('error', error))
  }
})

oauthApp.get('/success', (req, res) => {
  res.send('')
})

oauthApp.get('/', (req, res) => {
  res.redirect(301, `/oauth/auth`)
})

exports.oauth = functions.https.onRequest(oauthApp)
