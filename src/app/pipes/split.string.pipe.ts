import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitString'
})
export class SplitStringPipe implements PipeTransform {

    transform(value: unknown): string[] {
        if (typeof value != "string") {
            return [];
        }

        return value.split("\n").filter(s => s);
    }

}
