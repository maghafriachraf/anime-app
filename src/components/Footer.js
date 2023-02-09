import './footer.css'
import { Link } from "react-router-dom";

function Footer({}) {


	return (
		<footer className='footer' >

			<Link className="btn gofav" to={`/favoris`} >
              <div>Voir les favoris <i className="uis uis-favorite .icon"></i></div> 
            </Link>

		</footer>
	)
}

export default Footer
