import { Image } from "./image";

export const Gallery = (props) => {
  return (
    <div id='feature' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Feature</h2>
          
        </div>
        <div className='row'>
          <div className='feature-items'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-6'>
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}
