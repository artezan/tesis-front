import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { END_POINT_URL } from '_config/api.url';


@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    private socket: SocketIOClient.Socket; // The client instance of socket.io
    url = END_POINT_URL;

    constructor() {
        this.socket = io(this.url);
    }
    // // Emit: gist saved event
    // emitEventOnGistSaved(gistSaved): void {
    //     this.socket.emit('gistSaved', gistSaved);
    // }
    // // Emit: gist updated event
    // emitEventOnGistUpdated(gistUpdated): void {
    //     this.socket.emit('gistUpdated', gistUpdated);
    // }
    // // Consume: on gist saved
    // consumeEvenOnGistSaved(): void {
    //     const self = this;
    //     this.socket.on('gistSaved', gist => {
    //         console.log(
    //             'success',
    //             'NEW GIST SAVED',
    //             'A gist with title "' +
    //                 gist.title +
    //                 '" has just been shared' +
    //                 ' with stack: ' +
    //                 gist.technologies
    //         );
    //     });
    // }

    // // Consume on gist updated
    // consumeEvenOnGistUpdated(): void {
    //     const self = this;
    //     this.socket.on('gistUpdated', gist => {
    //         console.log(
    //             'info',
    //             'GIST UPDATED',
    //             'A gist with title "' + gist.title + '" has just been updated'
    //         );
    //     });
    // }
    // public send(message): void {
    //     this.socket.emit('message', message);
    // }
    // public onMessage(): Observable<any> {
    //     return new Observable<any>(observer => {
    //         this.socket.on('message', (data: any) => observer.next(data));
    //     });
    // }

    public onEvent(event: any): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
    /**
     * evento llamado en los gets user
     */
    public onGetEventUser(): Observable<string> {
        return new Observable<string>(observer => {
            this.socket.on('GET_USER', (userName: string) =>
                observer.next(userName)
            );
        });
    }

    /**
     * evento llamado en los Update table
     */
    public onGetEventTable(): Observable<string> {
        return new Observable<string>(observer => {
            this.socket.on('GET_TABLE', (tableName: string) =>
                observer.next(tableName)
            );
        });
    }
}
