// import { XMLHttpRequest } from 'xmlhttprequest'
//
// export { request, request2 }
//
// // Using callbacks:
// function request<Request, Response>(
//   method: 'GET' | 'POST',
//   url: string,
//   content?: Request,
//   callback?: (response: Response) => void,
//   errorCallback?: (err: any) => void) {
//
//   const request = new XMLHttpRequest();
//   request.open(method, url, true);
//   request.onload = function () {
//     if (this.status >= 200 && this.status < 400) {
//       // Success!
//       const data = JSON.parse(this.response) as Response;
//       callback && callback(data);
//     } else {
//       // We reached our target server, but it returned an error
//     }
//   };
//
//   request.onerror = function (err) {
//     // There was a connection error of some sort
//     errorCallback && errorCallback(err);
//   };
//   if (method === 'POST') {
//     request.setRequestHeader(
//       'Content-Type',
//       'application/x-www-form-urlencoded; charset=UTF-8');
//   }
//   request.send('content');
// }
//
// // Using promises:
// function request2<Request, Response>(
//   method: 'GET' | 'POST',
//   url: string,
//   content?: Request
// ): Promise<Response> {
//   return new Promise<Response>((resolve, reject) => {
//     request(method, url, content, resolve, reject);
//   });
// }
