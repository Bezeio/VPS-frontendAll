import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopTag = ({ brand, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag </h4>
      <div className="sidebar-widget-tag mt-25">
        {brand ? (
          <ul>
            
                <li >
                  <button
                    onClick={e => {
                      getSortParams("tag", brand);
                      setActiveSort(e);
                    }}
                  >
                    {brand}
                  </button>
                </li>
          </ul>
        ) : (
          "No tags found"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  brand: PropTypes.array
};

export default ShopTag;
