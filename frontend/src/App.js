import './index.css'
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


import Home from './pages/Home'
import About from './pages/About'
import Journal from './pages/Journal'
import WorkDetail from './pages/WorkDetail'
import Works from './pages/Works'


const client = new ApolloClient({
	uri : "http://localhost:1337/graphql", 
	cache: new InMemoryCache()
})

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/works" element={<Works />}></Route>
                        <Route path="/project/:id" element={<WorkDetail/>}></Route>
                        <Route path="/about" element={<About />} />
                        <Route path="/journal" element={<Journal />} />
                    </Routes>
                </div>
            </ApolloProvider>
        </Router>
    );
}

export default App;
