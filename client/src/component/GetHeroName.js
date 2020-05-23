import React from 'react';
import Dota2HeroNames from '../Data/Hero_ID-Name'
class GetHeroName extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        //console.log(Dota2HeroNames.heroes)
        let Hero_ID = this.props.HeroID;
        let HeroName;
        for(let i=0;i<Dota2HeroNames.heroes.length;i++) {
            if(Dota2HeroNames.heroes[i].id === Hero_ID) {
                HeroName=Dota2HeroNames.heroes[i].localized_name
            }
        }
        return (
            <div>
                {HeroName}
            </div>
        )
    }
}
export default GetHeroName;