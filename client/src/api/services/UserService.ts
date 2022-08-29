/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pick_User_email_or_name_or_phoneNumbers_ } from '../models/Pick_User_email_or_name_or_phoneNumbers_';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param userId
     * @param name
     * @returns User Ok
     * @throws ApiError
     */
    public static getUser(
        userId: number,
        name?: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{userId}',
            path: {
                'userId': userId,
            },
            query: {
                'name': name,
            },
        });
    }

    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static createUser(
        requestBody: Pick_User_email_or_name_or_phoneNumbers_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
