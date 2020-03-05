const GetNested =(obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

export default GetNested