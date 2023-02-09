import React , {useState , useEffect}  from "react";
import { useTable } from "react-table";
import * as ReactDOMServer from 'react-dom/server';
import { Link } from "react-router-dom";
import Footer from "./Footer"



function Table({setDetails,initialData}) {
  const [filteredData,setfData]= useState([]);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [filterOn, setfilter] = useState(false);


 

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleYear = e => {
    setSelectedYear(e.target.value);
  };

  const handleAge = e => {
    setSelectedAge(e.target.value);
  }; 

  useEffect(() =>{

    if(search || selectedYear || selectedAge){
      setfilter(true)
    if(search) {
      setSelectedAge("")
      setSelectedYear("")
      setfData(initialData.filter(d =>
      d.attributes.titles.en_jp.toLowerCase().includes(search.toLowerCase())
    ))}

    if(selectedYear) {
      setSelectedAge("")
      setSearch("")
      setfData(initialData.filter(d =>
      d.attributes.startDate.toLowerCase().includes(selectedYear.toLowerCase())
    ))}

    if(selectedAge) {
      setSearch("")
      setSelectedYear("")
      setfData(initialData.filter(d =>
      d.attributes.ageRatingGuide.toLowerCase().includes(selectedAge.toLowerCase())
    ))}
    
  }  else {
    setfilter(false)
    
  } 

  },[search, selectedYear, selectedAge,initialData])
 
  const data = React.useMemo(() => 
  (filterOn) ? (filteredData) : (initialData) 
  , [filterOn, filteredData, initialData] );
    
    
    const columns = React.useMemo(() => ([
    {
    Head : "Title",
    accessor : "attributes.titles.en_jp",
    
    },
    {
    Head : "Titre Japonais",
    accessor : "attributes.titles.ja_jp" 
    },
    {
    Head : "Age recommandé",
    accessor : "attributes.ageRatingGuide" 
    },
    {
    Head : "Date de sortie",
    accessor : "attributes.startDate",
    
    },
    { 
    Head : "Rang",
    accessor : "attributes.ratingRank" },
    {
      Head: "", 
      accessor: "id",
      
    }
    
    ]), []); 

    

const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})
return (
  <div> 
    <div className="container">
      <div className="catalogue">
        <div className="filtre">

        <div className="search"><i className="uil uil-search icon-search"></i><input type="text" placeholder="Search" onChange={handleSearch} /></div>
        
        
        <select value={selectedYear} onChange={handleYear}>
          <option value="">Année</option>
          {(Array.from({length: 2005 - 1998 + 1}, (_,i) => 1998 + i)).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
          
        </select>
        <select value={selectedAge} onChange={handleAge}>
          <option value="">Age recommandé</option>
          {(["Children","Teens 13 or older","17+ (violence & profanity)","Mild Nudity"]).map((age, i) => (
            <option key={`age-${i}`} value={age}>{age}</option>
          ))}
          
        </select>
        </div>

       
        <div className="top">
          Catalogue
        </div>
        <div>

        <table {...getTableProps()}>
            <thead> 
              {headerGroups.map((headerGroup) =>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column,i) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Head")} {(i!==5) && (<i className="uil uil-angle-down icon"></i>)} 
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
             
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr key={`row-${i}`} {...row.getRowProps()}>
                    
                    {row.cells.map((cell, index) => (
                      <td key={`cell-${row}-${index}`} {...cell.getCellProps()}>
                        { index === 5 ? <Link to={`/details`} className="moreDetails" onClick={() =>  setDetails(ReactDOMServer.renderToString(cell.render("Cell")))}>voir les details</Link> : cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
        <Footer></Footer>
    </div>
        
    );
  }

  export default Table;