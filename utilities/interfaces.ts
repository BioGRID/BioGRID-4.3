/**
 * This file is for declaring shared interfaces that can be
 * re-used in different areas of the site for typescript verification
 **/

export interface Linkout {
    to: string;
    text: string;
    title: string;
    icon?: string;
    internal: boolean;
    target?: string;
}
