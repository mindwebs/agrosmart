import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService{
    readonly baseApi: string = 'http://api.agrosmart.tech/';
    readonly distLocation: string = 'MyApplication/';
}