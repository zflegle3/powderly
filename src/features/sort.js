
const sortData = (data, property, limit) => {
    //if property is alphabetical handle it seperately 
    //else convert to numbers and handle 
    //handle favorites as boolean 

    const sorted = [...data].sort((a,b) => b[property] - a[property])
    console.log(sorted);
    return (sorted)
}

export default {sortData};