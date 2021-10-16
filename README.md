### Attention!

There's an issue currently that doesn't allow the application to get data from server's endpoints. It basically blocks the transaction due to security reasons.

*[Error Message] Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at `https://.../communitytiles.json`. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).* 
###### More about CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin

This issue is currently not able to be solved via client-side. 
##### A quick fix would be this firefox extension https://addons.mozilla.org/el/firefox/addon/cors-everywhere/. 
##### It enables temporarily CORS transactions.

### Setup

`npm install` για να περαστούν τα κατάλληλα modules

`npm start` για να ξεκινήσει η εφαρμογή στο `localhost:3000`
