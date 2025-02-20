import axios from 'axios'

const Index = ({ currentUser }) => {
  console.log(currentUser)

  return <h1>Index</h1>
}

Index.getInitialProps = async () => {
  const response = axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message)
  })

  return response.data
}

export default Index
