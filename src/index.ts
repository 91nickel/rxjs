import {Observable, Observer, of, from} from 'rxjs';
import axios from "axios";

// const o = of(5) // Promise.resolve(5)
//
// o.subscribe({
//   next: (value: any) => console.log('Next:', value),
//   complete: () => console.log('Complete!'),
//   error: (error) => console.log('Error!', error)
// })
const dataSource = function (observer: Observer<any>) {
    console.log('start receiving data...')
    // observer.next(1);
    // observer.next(2);
    // observer.complete();
    console.log('making request...');
    axios.get('https://api.github.com/search/repositories?q=netology-code/ndtnf-homeworks')
        .then(function (response) {
            console.log('calling observer.next()')
            observer.next(response.data)
        })

    return function () {
        return null;
    }
}
const dataSource2 = function (observer: Observer<any>) {
    let counter = 0;
    console.log('start receiving data2...')
    // observer.next(1);
    // observer.next(2);
    // observer.complete();
    const sourceId = setInterval(function () {
        console.log(`making request ${counter + 1} ...`);
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${counter + 1}`)
            .then(function (response) {
                console.log('calling observer2.next()')
                counter++;
                observer.next(response.data)
                if (counter > 4) {
                    observer.complete();
                    clearInterval(sourceId)
                }
            })
    }, 1000);
    return function () {
        return null;
    }
}

const dataStream = new Observable(dataSource);
const dataStream2 = new Observable(dataSource2);
const observer: Observer<any> = {
    next(value) {
        console.log(value)
    },
    error(err: any): void {
    },
    complete() {
        console.log('completed')
    }
}
const observer2: Observer<any> = {
    next(value) {
        console.log(value)
    },
    error(err: any): void {
    },
    complete() {
        console.log('completed')
    }
}
dataStream.subscribe(observer);
dataStream2.subscribe(observer2);