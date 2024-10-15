import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import { IQuestion, QuestionModel } from '../models/questionModel';
import { CategoryModel, ICategory } from '../models/categoryModel';


export function findQsn(query: FilterQuery<IQuestion>, options: QueryOptions = { lean: true }) {
    return QuestionModel.find({})
}
export function createQuestions(input: IQuestion): Promise<IQuestion> {

    console.log("input", input);

    const qsn = new QuestionModel(input); // Create a new instance of the user
    return qsn.save(); // Save it to the database and return the result as a promise
}

export function findAndUpdate(query: FilterQuery<IQuestion>, update: UpdateQuery<IQuestion>, options: QueryOptions) {
    return QuestionModel.findOneAndUpdate(query, update, options)
}


export function allCatagory(query: FilterQuery<ICategory>, options: QueryOptions = { lean: true }) {
    return CategoryModel.find({})
}

export function createCatagory(input: ICategory): Promise<ICategory> {

    console.log("input", input);

    const category = new CategoryModel(input); // Create a new instance of the user
    return category.save(); // Save it to the database and return the result as a promise
}
export async function questionListByCategory() {

    try {

        const result = await QuestionModel.aggregate([

            {
                $unwind: "$categories"
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "id",
                    as: "categoryName"
                }
            },
            {
                $unwind: "$categoryName"
            },
            {
                $group: {
                    _id: "$categoryName",
                    questions: {
                        $push: {
                            serialNo: "$serialNo",
                            questionText: "$questionText"
                        }
                    }
                }
            }
        ])

        console.log("resresultultresultresultresult", result);
        return result;
    } catch (error) {
        throw error;
    }
}


export async function aggregateQuestionsByCategory(categoryId: number) {
    try {

        const result = await QuestionModel.aggregate([

            {
                $unwind: "$categories"
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "id",
                    as: "categoryName"
                }
            },
            {
                $unwind: "$categoryName"
            },
            {
                $match: { "categoryName.id": categoryId }
            },
            {
                $group: {
                    _id: "$categoryName",
                    questions: {
                        $push: {
                            serialNo: "$serialNo",
                            questionText: "$questionText"
                        }
                    }
                }
            }
        ])

        console.log("resresultultresultresultresult", result);
        return result;
    } catch (error) {
        throw error;
    }
}


// export const addBulkQuestions = async (res: Response) => {
//     try {
//         // const file = req.file;
//         const file: { [key: string]: any } = {};
//         const results: any[] = [];

//         const filePath = path.join( __dirname, "..", "..", "..","uploads", "question.csv");

//         console.log('filePath', filePath);
        

//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (data) => results.push(data))
//             .on('end', async () => {

//                 console.log("csv files", results);
//                 for (const result of results) {
//                     const question = new QuestionModel({
//                         serialNo: result.serialNo,
//                         questionText: result.questionText,
//                         marks: result.marks,
//                         categories: result.categories.split(',').map((id: string) => id.trim())
//                     });
//                     await question.save();

//                     console.log("looooooooooooop");
//                 }
//                 console.log("done");
//                 res.statusCode(200)
//                 // sendResponse(res, true, 200, "get catagory qsn", []);
//             });
//     } catch (error) {
//         throw error;
//     }
// };