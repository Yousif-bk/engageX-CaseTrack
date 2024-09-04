import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  constructor(private http: HttpClient, private router: Router) { }

  signIn(signInReq: any): Observable<any> {
    return this.http.post(this.apiUrl + 'api/user/login', signInReq).pipe(
      tap((res: any) => {
        localStorage.setItem('App:jwt', res.token);
        localStorage.setItem('username', res.username);
        this.setIsLoggedIn(true);
        this.router.navigate(['/ladning']);
      })
    );
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }
  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  private isTokenAvailable(): boolean {
    return !!localStorage.getItem('App:jwt');
  }
  async logout(): Promise<any> {
    await localStorage.clear();
    this.setIsLoggedIn(false);
    await this.router.navigate(['auth/login']);
  }
}
