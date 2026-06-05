const accessToken = "pk.eyJ1IjoibWFyaW1heDEyMyIsImEiOiJjbXBtbnExMmswNHgxMnJwb3Vhem1vZWdyIn0.xsRuLrhv17wFzJvW3pvBjg";

fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=1600+Pennsylvania+Ave+NW&access_token=${accessToken}&session_token=test-123`)
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data.suggestions, null, 2)));
