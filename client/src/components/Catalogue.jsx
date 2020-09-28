import React from 'react';
import ProductCard from './ProductCard.jsx';
import { connect } from "react-redux";
import { getProducts, getCategory} from '../redux/actions';
import logoar from "../imagenes/logoaltres5.png";
import NoFound from './NoFound.jsx';

export class Catalogue extends React.Component {
  constructor() {
    super();
    this.state = { 
      show: true,
      style :{
        fontSize: 60,
        opacity: 0,
        transition: 'all 2s ease',
      }
    }
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
   
}
unMountStyle() { 
  this.setState({
    style: {
      fontSize: 60,
      opacity: 0,
      transition: 'all 1s ease',
    }
  })
}

mountStyle() { 
  this.setState({
    style: {
      fontSize: 100,
      opacity: 1,
      transition: 'all 1s ease',
    }
  })
}

transitionEnd(){
  if(!this.props.mounted){ 
    this.setState({
      show: false
    })
  }
}

// Ciclos de Vida

componentDidMount() {
  setTimeout(this.mountStyle, 20)
  if(this.props.category !== "todos" ) 
  this.props.getCategory(this.props.category)
else  
  this.props.getProducts();
  this.setState({isLoading: false})
}

componentWillReceiveProps(nextProps) {

if (this.props.category !== nextProps.category) {
  this.props.getCategory(nextProps.category);
}
}
// Cuando el componente va a recibir propiedades(sucede cada vez que el Nav Linkea una nueva ruta y App provee una categoría)
// El método componentWillReceiveProps comparará si ha cambiado la categoría y entonces despachará la acción correspondiente

    
  render(){
        
    return (
      
      <div>
          <div>
          </div>
          <div className='container-fluid'>
              <div className = 'row ' >
                { <div className ='p-3 mb-2 bg-dark text-white container-fluid' style={this.state.style} onTransitionEnd={this.transitionEnd}>
                <img className="logo"  src={logoar} alt='logo'/>
                </div>}
               { (!this.state.show && this.props.actual.length) ?  this.props.actual.map(p =>
                          <div key={'div'+ p.id} className="col-md container-fluid">
                                <ProductCard key={p.id} {...p}  />
                          </div>) : (this.props.actual.length ? <NoFound/> :'No se encontró nada' )}
              </div>
          </div>
    
        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    actual: state.catalogue,
    products:state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategory: (category) => dispatch(getCategory(category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);