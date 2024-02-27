import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

/*
HTTP-Interceptor to add baseURL to the api call before continuing 
*/
export class HTTPInterceptor implements HttpInterceptor {
    private baseUrl: String = environment.backendURL;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const httpRequest = req.clone({url: `${this.baseUrl}${req.url}`});
        return next.handle(httpRequest);
    }
    
}