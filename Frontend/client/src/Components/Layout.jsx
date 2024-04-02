import { Fragment } from "react"
import Navbar from "./Navbar"
import { Helmet } from "react-helmet"
const Layout = ({title,content,children}) => {
    
     
  return (
    <Fragment>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={content} />
        </Helmet>
        <Navbar/>
    <div className="container mt-5" >
        {children}
        
    </div></Fragment>
  )
}

export default Layout