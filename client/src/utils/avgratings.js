export function GetAvgRatings(ratingArr) {
    if (ratingArr?.length === 0)
        return 0
    const totalRevieCount = ratingArr?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    },)
    const multiplier = Math.pow(10, 1)
    const avgReviewCount = Math.round((totalRevieCount / ratingArr?.length) * multiplier) / multiplier
    return avgReviewCount
} 