import { useCallback, useEffect, useState } from "react";
import { changeLikeStatus,createCard, deleteCard, editCard, getCard, getCards,getMyCards 
} from "../services/cardApiService";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import normalizeCard from "../helpers/normalization/normalizeCard";
import { useUser } from "../../users/providers/UserProvider";

export default function useCards() {
 const[card,setCard]=useState(null)
 const[cards,setCards]=useState([])
 const[error,setError]=useState()
 const[isLoading,setIsLoading]=useState(true)
 const navigate = useNavigate();
 const setSnack = useSnack()
 useAxios()
 const [filterCards, setFilterCards] = useState(null);
 const [query, setQuery] = useState("");
 const {user} = useUser()
 const [searchParams] =useSearchParams()

useEffect(() => {
  setQuery(searchParams.get("q") ?? "");
}, [searchParams]);
useEffect(() => {
  if (cards)
    setFilterCards(
      cards.filter(
        (card) =>
          card.title.includes(query) || String(card.bizNumber).includes(query)
      )
    );
}, [cards, query]);

const getCardsData = useCallback(async() =>{
    try{
      setError(null)
      setIsLoading(true)
      const data = await getCards()
      setCards(data)
      setSnack("success", "All the cards are here")
    }
    catch(error){
      setError(error.message)
    }
    setIsLoading(false)
},[setSnack])
  
const getCardById = useCallback(async(cardId)=>{
  try{
    setError(null)
    setIsLoading(true)
    const data= await getCard(cardId) 
    setCard(data)
  }catch(error){
    setError(error.message)
  }
  setIsLoading(false)
},[])

const getCardByIdEdit = useCallback(async(id)=>{
  setError(null)
  setIsLoading(true)
  const data= await getCard(id) 
  setCard(data)
  return data
},[])
    

const handleCreateCard = useCallback(
  async (cardFromClient) => {
    setError(null);
    setIsLoading(true);
    try {
      const card = await createCard(normalizeCard(cardFromClient));
      setCard(card);
      setSnack("success", "A new business card has been created");
      setTimeout(() => {
        navigate(ROUTES.ROOT);
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
},[setSnack, navigate]);  

const handleUpdateCard = useCallback(
  async (cardId, cardFromClient) => {
    setIsLoading(true);
    try {
      const card = await editCard(cardId, normalizeCard(cardFromClient));
      setCard(card);
      setSnack("success", "The business card has been successfully updated");
      setTimeout(() => {
        navigate(ROUTES.ROOT);
      }, 1000);
      } catch (error) {
        setError(error.message);
      }
    setIsLoading(false);
},[setSnack, navigate]);

const handleGetMyCards = useCallback(async () => {
  try {
    const cards = await getMyCards();
    setCards(cards)
  } catch (error) {
    setError(error.message)
  }
  setIsLoading(false)
}, []);

const handleGetFavCards= useCallback(async()=>{
  try {
    const cards = await getCards();
    const favCards = cards.filter((card)=>card.likes.includes(user._id))
    setCards(favCards)
  } catch (error) {
    setError(error)
  }
  setIsLoading(false)
},[user])

const handleDeleteCard = useCallback(async (id)=>{
  try {
    setIsLoading(true)
    await deleteCard(id);
    setSnack("success","The business card has been Deleted")
    setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
    setError(error)
  }
},[setSnack])
    

const handleCardLike = useCallback(async (id,isLiked) => {
  try {
    await changeLikeStatus(id);
   if(isLiked){ 
    setSnack("error", "The business card has been unLiked")
  }else{
    setSnack("success", "The business card has been Liked")
}
  } catch (error) {
    setError(error)
  }
  setIsLoading(false);
},[setSnack]);

  return{
    card,
    cards,
    isLoading,
    error,
    filterCards,
    getCardsData,
    getCardById,
    handleDeleteCard,
    handleCardLike,
    handleCreateCard,
    handleUpdateCard,
    getCardByIdEdit,
    handleGetMyCards,
    handleGetFavCards,  
}
}