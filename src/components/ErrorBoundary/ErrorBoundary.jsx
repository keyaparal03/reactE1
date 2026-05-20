import {

  Component

} from 'react'

import './ErrorBoundary.css'

class ErrorBoundary extends Component {

  constructor(props){

    super(props)

    this.state = {

      hasError:false
    }
  }

  static getDerivedStateFromError(){

    return {

      hasError:true
    }
  }

  componentDidCatch(error){

    console.log(error)
  }

  render(){

    if(this.state.hasError){

      return (

        <div className='error-page'>

          <h1>

            Something Went Wrong

          </h1>

          <p>

            Please refresh the page.

          </p>

          <button

            onClick={() =>
              window.location.reload()
            }
          >

            Reload

          </button>

        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary