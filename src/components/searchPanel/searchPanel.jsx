import React from 'react';
import Search from '@/icons/search';
import './searchPanel.css'
import CustomButton from "@/UI/button/button";

const SearchPanel = () => {
    return (
        <div className='search-panel'>
            <Search/>
            <input className='search-panel__input' placeholder='Search'/>
            <CustomButton content={
                <span className='search-panel__button'>
                    Search
                </span>
            }/>
        </div>
    );
};

export default SearchPanel;