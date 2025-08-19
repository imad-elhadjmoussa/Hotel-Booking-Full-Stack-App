import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
    className?: string;
}

const PaginationControl = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5,
    className = "",
}: PaginationProps) => {
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const renderPaginationItems = () => {
        const items = [];

        // Previous button
        items.push(
            <PaginationItem key="prev">
                <PaginationPrevious
                    size={"sm"}
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                    }}
                    isActive={currentPage > 1}
                />
            </PaginationItem>
        );

        // Page numbers
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        size={"sm"}
                        href="#"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        isActive={1 === currentPage}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        size={"sm"}
                        href="#"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        size={"sm"}
                        href="#"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                        isActive={totalPages === currentPage}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Next button
        items.push(
            <PaginationItem key="next">
                <PaginationNext
                    size={"sm"}
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                    }}
                    isActive={currentPage < totalPages}
                />
            </PaginationItem>
        );

        return items;
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination className={className}>
            <PaginationContent>
                {renderPaginationItems()}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControl;