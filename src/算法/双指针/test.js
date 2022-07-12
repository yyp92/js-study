const threeSum = (nums) => {
    const res = []

    if (nums.length < 3) {
        return []
    }
    
    let r = nums.length
    let l = 0
    nums.sort((a, b) => a - b > 0)

    for (let i = 0; i < nums.length; i++) {
        const sum = nums[i] + nums[l] + nums[r]

        while (l < r) {
            if (sum < 0) {
                l++
            }
            else if(sum > 0) {
                r--
            }
            else {
                res.push([nums[i], nums[l], nums[r]])
            }
        }
    }

    return res
}

console.log(threeSum([-1,0,1,2,-1,-4]))





const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        const resizeFn = () => {
            const windowWth = window.innerWidth
            const windowHeight = window.innerHeight

            setWidth(windowWth)
            setHeight(windowHeight)
        }

        window.addEventListener('resize', resizeFn, false)

        return () => {
            window.removeEventListener('resize', resizeFn, false)
        }
    }, [])

    return [width, height]
}
    