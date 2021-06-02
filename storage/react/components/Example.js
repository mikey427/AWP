// EXAMPLE OF WHAT A REACT COMPONENT CAN LOOK LIKE

// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchCampuses, delCampus } from '../redux/campuses';
// import { Link } from 'react-router-dom';
// import NewCampusForm from './NewCampusForm';

// export class AllCampuses extends React.Component {
//   constructor () {
//     super();
//     this.handleDelete = this.handleDelete.bind(this);
//   }
//   componentDidMount () {
//     this.props.fetch();
//   }

//   handleDelete (event) {
//     this.props.deleteCampus(event.target.id, history);
//   }

//   render () {
//     return (
//       <div>
//         <ul>
//           {this.props.campuses &&
//             this.props.campuses.map(campus => {
//               return (
//                 <li key={campus.id} img={campus.imageUrl}>
//                   <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
//                   <button
//                     id={campus.id}
//                     type='button'
//                     onClick={this.handleDelete}
//                   >
//                     X
//                   </button>
//                 </li>
//               );
//             })}
//         </ul>
//         <NewCampusForm />
//       </div>
//     );
//   }
// }

// const mapState = state => {
//   return {
//     campuses: state.campuses.campuses
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     fetch: () => {
//       dispatch(fetchCampuses());
//     },
//     deleteCampus: id => {
//       dispatch(delCampus(id, history));
//     }
//   };
// };

// export default connect(mapState, mapDispatch)(AllCampuses);
