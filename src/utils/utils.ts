/**
 * 数组分割
 * @param arr 数组
 * @param num 分割大小
 */
export const chunk = (arr: any[], num: number) => {
    let a: any = [[]]
    let m = 0
    for (let i = 0; i < arr.length; i++) {
        if (i > 0 && i % num == 0) {
            m++
            a.push([])
        }
        a[m].push(arr[i])
    }
    return a
}

