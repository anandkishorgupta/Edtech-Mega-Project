import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const InstructorChat = () => {
    const [currChart, setCurrChart] = useState("students")

    // Function to generate random colors for the chart
    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }
    // data for chart displaying student info

    // create data for chart displaying income info

    // options for the chart
    return (
        <div>

        </div>
    )
}

export default InstructorChat