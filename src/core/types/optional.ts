/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * type Optional<Post, 'id' | 'email'>
 * 
 * Optional = {
 *  id?: string;
 *  name: string;
 *  email?: string;
 * }
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
