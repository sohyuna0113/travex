import React, { useState, useEffect } from 'react'
import List from './Post/List.js'
import axios from 'axios'

import { DropdownButton, Dropdown } from "react-bootstrap"
import { GNBDiv, FooterDiv } from '../Style/MainPageCSS'

function MainPage() {
    const [PostList, setPostList] = useState([]);
    const [Sort, setSort] = useState("Recent");
    const [SearchTerm, setSearchTerm] = useState("");
    const [Skip, setSkip] = useState(0);
    const [LoadMore, setLoadMore] = useState(true);

    const getLoadMore = () => {
        let body = {
            sort: Sort,
            searchTerm: SearchTerm,
            skip: Skip,
        }
      axios
        .post("/api/post/list", body)
        .then((response) => {
          if(response.data.success) {
            setPostList([...PostList, ...response.data.PostList]);
            setSkip(Skip + response.data.postList.length)
            if(response.data.postList.length < 5) {
                setLoadMore(false)
            }
          }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getPostList = () => {
        setSkip(0);

        let body = {
            sort: Sort,
            searchTerm: SearchTerm,
            skip: 0,
        }

        axios
            .post("/api/post/list", body)
            .then((response) => {
                if (response.data.success) {
                    // console.log(response.data.postList)
                    setPostList([...response.data.postList])
                    setSkip(response.data.postList.length)
                    if (response.data.postList.length < 5) {
                        setLoadMore(false)
                    }
                    if (response.data.postList.length == 0) {
                        setLoadMore(false)
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getPostList()
    }, [Sort])

    const SearchHandler = () => {
        getPostList();
    }

  return (
    <div>
        <GNBDiv>
            <div className='search'>
                <input 
                    type='text'
                    value={SearchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            SearchHandler();
                        }
                    }}
                    />
                    <button onClick={() => SearchHandler()}>
                        <i className='bi bi-search'></i>
                    </button>
            </div>
        <DropdownButton 
            variant="outline-secondary" 
            title={Sort}
            id="input-group-dropdown-1">
          <Dropdown.Item onClick={() => setSort("Recent")}>
            Recent
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("Popular")}>
            Popular
          </Dropdown.Item>
        </DropdownButton>
        </GNBDiv>
        <List PostList={PostList} />
        {LoadMore && (
            <FooterDiv>
                <button
                    style={{ marginBottom: "10vh" }}
                    onClick={() => getLoadMore()}>
                        Load More
                    </button>
            </FooterDiv>
        )}
    </div>
  )
}

export default MainPage