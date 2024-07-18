import { Stack, Box, Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { EventCard } from "../../components/event-card/full";
import { useEffect, useState } from "react";
import eventService from "../../services/event-service";
import { Evento } from "../../types/Event";
import { useAuth } from "../../providers/auth/AuthContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
export const SearchEvents = () => {
  const [events, setEvents] = useState<Evento[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(5);
  const { isLoggedIn, userId } = useAuth();

  useEffect(() => {
    const res = async () => {
      if (isLoggedIn) {
        const res = await eventService.getEventForAnUserLogged(
          userId!!,
          currentPage,
          4
        );
        //@ts-ignore
        setMaxPages(res.totalPages);
        //@ts-ignore
        setEvents(res.content);
      } else {
        const res = await eventService.all(currentPage, 4);
        //@ts-ignore
        setMaxPages(res.totalPages);
        //@ts-ignore
        setEvents(res.content);
      }
    };
    res();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < maxPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleEllipsisClick = (type: "start" | "end") => {
    if (type === "start") {
      const averagePage = Math.floor((currentPage + 0) / 2);
      handlePageClick(averagePage);
    } else if (type === "end") {
      const averagePage = Math.floor((currentPage + maxPages - 1) / 2);
      handlePageClick(averagePage);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];

    // Primera página
    pages.push(
      <Button
        key={0}
        onClick={() => handlePageClick(0)}
        isActive={currentPage === 0}
      >
        1
      </Button>
    );

    if (maxPages > 1) {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(maxPages - 1, currentPage + 1);

      if (currentPage > 2) {
        pages.push(
          <Button
            key="start-ellipsis"
            mx={2}
            cursor="pointer"
            onClick={() => handleEllipsisClick("start")}
          >
            ...
          </Button>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 0 && i !== maxPages - 1) {
          pages.push(
            <Button
              key={i}
              onClick={() => handlePageClick(i)}
              isActive={currentPage === i}
            >
              {i + 1}
            </Button>
          );
        }
      }

      if (currentPage < maxPages - 3) {
        pages.push(
          <Button
            key="end-ellipsis"
            mx={2}
            cursor="pointer"
            onClick={() => handleEllipsisClick("end")}
          >
            ...
          </Button>
        );
      }

      // Última página
      pages.push(
        <Button
          key={maxPages - 1}
          onClick={() => handlePageClick(maxPages - 1)}
          isActive={currentPage === maxPages - 1}
        >
          {maxPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <Stack as={Box} height={"85vh"}>
      <Stack
        as={Box}
        direction={{ base: "column", md: "row" }}
        justify={{ base: "none", md: "center" }}
        align={"center"}
        textAlign={"center"}
        wrap={{ base: "nowrap", md: "wrap" }}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
        overflow={"auto"}
      >
        {events?.map((e: Evento) => (
          <EventCard key={e.id} evento={e}></EventCard>
        ))}
      </Stack>
      {/* Paginacion */}
      <Box textAlign="center" mt="4">
        <ButtonGroup>
          <IconButton
            onClick={handlePrev}
            isDisabled={currentPage === 0}
            aria-label=""
            icon={<ChevronLeftIcon />}
          />
          {renderPageNumbers()}
          <IconButton
            onClick={handleNext}
            isDisabled={currentPage === maxPages - 1}
            aria-label=""
            icon={<ChevronRightIcon />}
          />
        </ButtonGroup>
      </Box>
    </Stack>
  );
};
