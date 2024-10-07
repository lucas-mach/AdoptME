import { useEffect, useState} from 'react'


const Home = () => {

    const [pets, setPets] = useState(null)
    // When componet loads, automatically call our api to get all pets and store into "pets"
    useEffect(() => {
        const fetchPets = async () => {
            const response = await fetch('/api/pets/allpets')
            const json = await response.json()

            if (response.ok) {
                setPets(json)
            }
        }

        fetchPets()
    }, [])

    return (
        <div className="home">
            <div className="pets">
                {pets && pets.map((pet) => (
                    <p key={pet._id}>{pet.animal}</p>
                ))}
            </div>
        </div>
    )
}

export default Home