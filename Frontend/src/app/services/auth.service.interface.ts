import { Observable, Subscription , EMPTY, BehaviorSubject} from 'rxjs';


export interface IAuthService{

    login(username: string, password: string, role: string): Observable<any>;

    get isLoggedIn(): boolean;

    getToken(): any;

    logOut(): any;

    register(username: string, password: string, role: String): Observable<any>;

    getStudentDashBoard(username: string): Observable<any>;


}