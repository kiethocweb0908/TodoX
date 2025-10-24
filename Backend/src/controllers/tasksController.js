import Task from "../models/Task.js"

export const getAllTasks = async (req, res) => {

    const {filer = "today"} = req.query;
    const now = new Date();
    let startDate;

    switch (filer) {
        case 'today': {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case 'week': {
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case 'month': {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1)
            break;
        }
        case 'all':
        default: {
            startDate = null;
        }
    }

    const query = startDate ? { createdAt: {$gte: startDate} } : {}

    try {
        // const tasks = await Task.find().sort({createdAt: -1});
        // throw new Error("lỗi gì đó");
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [{$sort: {createdAt: -1}}],
                    activeCount: [
                        {$match: {status: "active"}},
                        {$count: "count"},
                    ],
                    completeCount: [
                        {$match: {status: "complete"}},
                        {$count: "count"},
                    ]
                }
            }
        ])

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0
        const completeCount = result[0].completeCount[0]?.count || 0

        res.status(200).json({tasks, activeCount, completeCount});
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks: ", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}

export const createTask = async (req, res) => {
    try {
        console.log("Body nhận được:", req.body);
        const {title} = req.body;
        const task = new Task({title});

        const newTask = await task.save();
        res.status(201).json(newTask);
       
    } catch (error) {
        console.error("Lỗi khi gọi createTask: ", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}


export const updateTask = async (req, res) => {
    try {
        console.log("Body nhận được:", req.body);
        const {title, status, completeAt} = req.body;
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completeAt
            },
            {new : true}
        );
        if(!updateTask) {
            return req.status(404).json({message: "Nhiệm vụ không tồn tại"});
        }
        res.status(200).json(updateTask)
    } catch (error) {
        console.error("Lỗi khi gọi updateTask: ", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if(!deleteTask) {
            return res.status(404).json({message: "Nhiệm vụ không tồn tại"})
        }
        
        res.status(200).json(deleteTask)
    } catch (error) {
        console.error("Lỗi khi gọi deleteTask: ", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}