import { Box } from "@chakra-ui/react";
import styles from "../pages/Home.module.css"

const Pagination = ({ items, pageSize, currentPage, onPageChange }: any) => {
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    return (
        <Box mb={10}>
            <ul className={styles.pagination}>
                {pages.map((page) => {
                    return (
                        <li
                            key={page}
                            className={
                                page === currentPage ? styles.pageItemActive : styles.pageItem
                            }
                            onClick={() => onPageChange(page)}
                        >
                            <a className={styles.pageLink} >{page}</a>
                        </li>
                    )
                })}
            </ul>
        </Box>
    );
};

export default Pagination;