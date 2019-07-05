import React, {useState} from 'react';

import {Layout, Lang, Nav, Screens, Particles } from './../components/Home';

const Home = () => {
    const [activeScreen, setActiveScreen] = useState(0);

    return (
        <div className="Home">
            <Layout>
                <Particles />
                <Lang />
                <Nav 
                    activeLink={activeScreen}
                    setActiveLink={setActiveScreen}    
                />
                <Screens />
            </Layout>
        </div>
    );
};

export default Home;
