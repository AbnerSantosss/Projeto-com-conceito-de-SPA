export class Router {
  routes = {}
  routeBack = {
    '/': 'url(./img/page-1/background.png)',
    '/explorer': 'url(./img/page-1/mountains-universe-3.png)',
    '/universe': 'url(./img/page-1/mountains-universe02.png)'
  }

  add(routName, page) {
    this.routes[routName] = page
  }

  route(event) {
    event = event || window.event

    event.preventDefault()

    window.history.pushState({}, '', event.target.href)

    this.handle(event.target.href)
  }

  handle() {
    const { pathname } = window.location

    let body = document.querySelector('body')

    let backgru = this.routeBack[pathname] || this.routeBack['/']
    body.style.backgroundImage = backgru

    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
  }
}
