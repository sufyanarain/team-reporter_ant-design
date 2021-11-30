import { useState, useEffect } from 'react'
import Navbar from '../common/Navbar'
import { useHistory } from "react-router-dom";
import TeamCard from '../common/TeamCard.js'
import ModalTeam from './Modal'
import './teams.css'
// Firebse
import { db } from '../../Firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

let currentUser = localStorage.getItem('currentUser')
currentUser = JSON.parse(currentUser)

function Teams() {
  const history = useHistory();
  let [teamsCard, setTeamsCard] = useState([])
  console.log(teamsCard)

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, "teams"), where("admin", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {

        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        });
        setTeamsCard(arr)
        console.log("Current cities in CA: ", arr);
      });

    }

  }, []);


  return (
    <div>
      <Navbar />
      <h1> Teams You Own</h1>
      {teamsCard.map((elem, index) => {
        return (
          <TeamCard
            teamName={`Team Name :  ${elem.teamName}`} settingFunc={(e) => { console.log(elem.teamUid)
              localStorage.setItem('currentTeamUid', elem.teamUid)
              history.push("/Settings");
            }}
            members={elem.members.join(' , ')}
          />
        )
      })}

      <ModalTeam className="createTeamModal" />
    </div>
  )
}

export default Teams
