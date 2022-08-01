import socket from '@/lib/socket';



export default function fetch<T = any>(
    event: string,
    data = {},
): Promise<T> {

    return new Promise((resolve) => {
        socket.emit(event, data, (res: any) => {
            resolve(res)
        });
    });
}
