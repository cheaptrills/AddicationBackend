const graphql = require('graphql');
const User = require('../models/userModel');
const Diary = require('../models/diaryModel');
const Task = require('../models/taskModel');
const Achievements = require('../models/achievementsModel');

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const userType = new GraphQLObjectType({
    name: 'User',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        drug: { type: GraphQLInt },
        task: {
            type: new GraphQLList(TaskType),
            resolve(parent,args){
                return parent.taskID.map(e => Task.findById(e));
            }
        },
        achievement: {
            type: new GraphQLList(AchievementType),
            resolve(parent,args){
                return parent.achievementID.map(e => achievement.findById(e));
            }
        },
    })
});

const taskType = new GraphQLObjectType({
    name: 'Task',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        title: { type: GraphQLString }, 
        description: { type: GraphQLString },
        drugs: { type: GraphQLInt }, 
        difficulty: { type: GraphQLInt },
        items: {
            type: new GraphQLList(GraphQLString)
        },
    })
});

const achievementType = new GraphQLObjectType({
    name: 'achievement',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        title: { type: GraphQLString }, 
        description: { type: GraphQLString },
        level: { type: GraphQLInt }, 
    })
});

const diaryType = new GraphQLObjectType({
    name: 'diary',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        title: { type: GraphQLString }, 
        entry: { type: GraphQLString },
        user: { type: userType,
            resolve(parent,args){
                return User.findById(parent.userID);
            }
        }
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular 
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks:{
            type: new GraphQLList(taskType),
            resolve(parent, args){
                return Task.find({});
            }
        },
        task:{
            type: taskType,
            args: {
                id: { type: GraphQLID}
            },
            resolve(parent,args){
                return Task.findById(args.id);
            }
        },
        drugstasks: {
            type: new GraphQLList(taskType),
            args: {
                drugs: { type: GraphQLInt}
            },
            resolve(parent,args){
                return Task.find({drugs: args.drugs})
            }
        }
    }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: taskType,
            args: {
                //GraphQLNonNull make these field required
                title: { type: new GraphQLNonNull (GraphQLString) }, 
                description: { type: new GraphQLNonNull (GraphQLString) },
                drugs: { type: new GraphQLNonNull (GraphQLInt) }, 
                difficulty: { type: new GraphQLNonNull (GraphQLInt) },
                items: {type: new GraphQLList( GraphQLString ) },
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    description: args.description,
                    drugs: args.drugs,
                    difficulty: args.difficulty,
                    items: args.items,
                });
                return task.save();
            }
        },
        addDiary: {
            type: diaryType,
            args: {
                //GraphQLNonNull make these field required
                created: { type: new GraphQLNonNull (GraphQLInt) },
                title: { type: new GraphQLNonNull (GraphQLString) }, 
                entry: { type: new GraphQLNonNull (GraphQLString) },
                userID: { type: new GraphQLNonNull (GraphQLString) }, 
            },
            resolve(parent, args) {
                let diary = new Diary({
                    created: args.created,
                    title: args.title,
                    entry: args.entry,
                    userID: args.userID,
                });
                return diary.save();
            }
        },
        addAchievement: {
            type: achievementType,
            args: {
                //GraphQLNonNull make these field required
                title: { type: new GraphQLNonNull (GraphQLString) }, 
                description: { type: new GraphQLNonNull (GraphQLString) },
                level: { type: new GraphQLNonNull (GraphQLInt) }, 
            },
            resolve(parent, args) {
                let achievement = new Achievements({
                    title: args.title,
                    description: args.entry,
                    level: args.level,
                });
                return achievement.save();
            }
        },
        
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});