import React from 'react';


class List_AZS extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         Rss: this.props.RSS, ObjList: this.props.obLists, nameObj: null,
         dvcs: null, dvcOnasz: null, nameAZS: null
      };
   }
   render() {
      return (
         <div>
            <center><h3>List_AZS</h3></center>
            <hr />
            <br />
            <ul className="hr">
               {
                  this.props.obLists.map(el => (
                     <li key={'li ' + el.id} width='370'>
                        <button className='btn_Image'>
                           <div className="slider" width='400px'>
                              <div className="slider-slide">
                                 <img src="/images/azk3.jpg"
                                    alt="..." width='60' height='70' />
                                 <div className="slide-controls">
                                    <center>
                                       {el.nm}
                                    </center>
                                 </div>
                              </div>
                           </div>
                        </button>
                     </li>
                  ))
               }
            </ul>

            <br />
            <br />
            <br />

            <hr />
            <ol className="NumList">
               {this.props.obLists.map(el => (
                  <li key={el.id}>{el.id + '  -  ' + el.nm}</li>
               ))}
            </ol>
            <br />
            <h4>{this.props.RSS}</h4>
            <hr />
         </div>
      );
   }
}

export default List_AZS;