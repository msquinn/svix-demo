import { useCallback, useEffect, useMemo, useState } from "react";
import { ListResponseEventTypeOut, Svix } from "svix";
import { getErrorMessage } from "@/utils/errors";

export const UseEventTable = () => {
  const [eventTypes, setEventTypes] = useState<ListResponseEventTypeOut | null>(
    null
  );
  const svix = useMemo(
    () => new Svix(process.env.NEXT_PUBLIC_SVIX_API_KEY as string),
    []
  );
  const [open, setOpen] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const fetchedEventTypes = await svix.eventType.list();
    setEventTypes(fetchedEventTypes);
  }, [svix]);

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await svix.eventType.delete(id);
        fetchData();
      } catch (e) {
        setErrorMessage(getErrorMessage(e));
      }
    },
    [fetchData, svix.eventType]
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");
    if (name && description) {
      try {
        await svix.eventType.create({
          name: name.toString(),
          description: description.toString(),
        });
        fetchData();
        setOpen(false);
      } catch (e) {
        setErrorMessage(getErrorMessage(e));
      }
    }
  };

  useEffect(() => {
    if (svix) {
      fetchData();
    }
  }, [fetchData, svix]);

  const updateMyData = useCallback(
    async (rowIndex: number, columnId: string, value: string) => {
      setSubmitDisabled(true);
      const row = eventTypes?.data[rowIndex];
      if (row) {
        try {
          await svix.eventType.update(row.name, { ...row, [columnId]: value });
          fetchData();
        } catch (e) {
          setErrorMessage(getErrorMessage(e));
        }
      }
    },
    [eventTypes, fetchData, svix.eventType]
  );

  return {
    eventTypes,
    onDelete,
    onSubmit,
    open,
    setOpen,
    submitDisabled,
    errorMessage,
    setErrorMessage,
    updateMyData,
  };
};
