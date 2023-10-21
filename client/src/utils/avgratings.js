export function GetAvgRatings(ratingArr) {
    console.log(ratingArr)
    if (ratingArr?.length === 0)
        return 0
    const totalRevieCount = ratingArr?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    },0)
    console.log(totalRevieCount)
    const multiplier = Math.pow(10, 1)
    const avgReviewCount = Math.round((totalRevieCount / ratingArr?.length) * multiplier) / multiplier
    // to get  point after decimal
    return avgReviewCount
} 