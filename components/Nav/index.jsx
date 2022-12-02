import styles from "./index.module.css";

const Nav = (props) => {
  return (
    <div className={styles.nav}>
      {!props.noPrev ?
        <a
          href={`${props.prev}.md`}
          className={`${styles.navItem} internal-link`}
        >
          <svg
            className={styles.navSvg}
            viewBox="0 0 1024 1024"
            width="40"
            height="40"
          >
            <path
              d="M143 462h800c27.6 0 50 22.4 50 50s-22.4 50-50 50H143c-27.6 0-50-22.4-50-50s22.4-50 50-50z"
              p-id="2162"
              fill="#e6e6e6"
            ></path>
            <path
              d="M116.4 483.3l212.1 212.1c19.5 19.5 19.5 51.2 0 70.7s-51.2 19.5-70.7 0L45.6 554c-19.5-19.5-19.5-51.2 0-70.7 19.6-19.6 51.2-19.6 70.8 0z"
              p-id="2163"
              fill="#e6e6e6"
            ></path>
            <path d="M328.5 328.6L116.4 540.7c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7z"></path>
          </svg>
          <span>{props.prev}</span>
        </a> : null}
      {!props.noNext ?
        <a
          href={`${props.next}.md`}
          className={`${styles.navItem} internal-link`}
          data-navitem
        >
          <span>{props.next}</span>
          <svg
            className={styles.navSvg}
            viewBox="0 0 1024 1024"
            width="40"
            height="40"
          >
            <path
              d="M881 562H81c-27.6 0-50-22.4-50-50s22.4-50 50-50h800c27.6 0 50 22.4 50 50s-22.4 50-50 50z"
              p-id="1135"
              fill="#e6e6e6"
            ></path>
            <path
              d="M907.6 540.7L695.5 328.6c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0L978.4 470c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z"
              p-id="1136"
              fill="#e6e6e6"
            ></path>
            <path
              d="M695.5 695.4l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L766.2 766.1c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7z"
              p-id="1137"
              fill="#e6e6e6"
            ></path>
          </svg>
        </a> : null}
    </div>
  );
};

export default Nav;
