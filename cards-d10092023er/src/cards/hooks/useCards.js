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
    cards.filter((card)=>card.user_id === (user._id))
  } catch (error) {
    setError(error.message)
  }
  setIsLoading(false)
}, [ user ]);

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
/*
import { useCallback, useState } from "react";
import {
  createCard,
  editCard,
  getCard,
  getCards,
} from "../services/cardsApiService";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useAxios from "../../hooks/useAxios";
import normalizeCard from "../helpers/normalization/normalizeCard";

export default function useCards() {
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const setSnack = useSnack();

  useAxios();

  const getAllCards = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await getCards();
      setCards(data);
      setSnack("success", "All the cards are here");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [setSnack]);

  const getCardById = useCallback(async (id) => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await getCard(id);
      setCard(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

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
    },
    [setSnack, navigate]
  );

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
    },
    [setSnack, navigate]
  );

  const handleCardDelete = useCallback((id) => {
    console.log("you deleted card no" + id);
  }, []);

  const handleCardLike = useCallback((id) => {
    console.log("you liked card no" + id);
  }, []);

  return {
    cards,
    card,
    error,
    isLoading,
    getAllCards,
    getCardById,
    handleCardDelete,
    handleCardLike,
    handleCreateCard,
    handleUpdateCard,
  };
}
*/
/*
import { useCallback, useState, useEffect, useContext } from "react";
import {
  createCard,
  editCard,
  getCard,
  getCards,
} from "../services/cardsApiService";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useAxios from "../../hooks/useAxios";
import normalizeCard from "../helpers/normalization/normalizeCard";
import UserSearchContext from "../../providers/UserSearchContext";
export default function useCards() {
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const setSnack = useSnack();

  const { keySearch } = useContext(UserSearchContext)

  useAxios();

  useEffect(() => {
    if (!keySearch.trim()) return
    console.log({ keySearch })
    let res = []
    for (let i = 0; i < cards.length; i++) {
      let title = cards[i].title
      if (title.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1) {
        res = [...res, cards[i]]
      }
    }
    setFilteredCards(res)
  }, [cards, keySearch])
  console.log({ filteredCards })
  const getAllCards = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await getCards();
      setCards(data);
      setSnack("success", "All the cards are here");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [setSnack]);

  const getCardById = useCallback(async (id) => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await getCard(id);
      setCard(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

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
    },
    [setSnack, navigate]
  );

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
    },
    [setSnack, navigate]
  );

  const handleCardDelete = useCallback((id) => {
    console.log("you deleted card no" + id);
  }, []);

  const handleCardLike = useCallback((id) => {
    console.log("you liked card no" + id);
  }, []);

  return {
    cards,
    card,
    error,
    isLoading,
    filteredCards,
    getAllCards,
    getCardById,
    handleCardDelete,
    handleCardLike,
    handleCreateCard,
    handleUpdateCard,
  };
}
*/