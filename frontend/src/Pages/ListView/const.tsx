import { Checkbox } from "@/components/ui/checkbox"
import { Task, Assignee } from "@/types/Task"
import { ColumnDef, CellContext, FilterFn } from "@tanstack/react-table"
import { Tag } from "@/types/Task"
import moment from "moment"

const filterTags: FilterFn<any> = (row, columnId, filterValue) => {
  const tags = row.getValue(columnId);
  if (Array.isArray(tags)) {
    return tags.some(tag =>
      tag.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return false;
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: (props: CellContext<Task, unknown>) => {
      const dueDate = moment(props.cell.row.original.duedate);
      const now = moment();
      const hoursLeft = dueDate.diff(now, 'hours');
      const daysLeft = dueDate.diff(now, 'days');
      
      let timeLeft;
      if (hoursLeft <= 24) {
        timeLeft = `${hoursLeft} hours left`;
      } else {
        timeLeft = `${daysLeft} days left`;
      }
  
      return (
        <div>
          {timeLeft}
        </div>
      );
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "author.name",
    header: "Created By",
  },
  {
    accessorKey: "assignees",
    header: "Assignees",
    cell: (props: CellContext<Task, unknown>) => {
      const assignees: Assignee[] = props.cell.row.original.assignees as Assignee[];
      return (
        <div className="flex flex-wrap gap-2">

          {assignees && assignees.map((assignee: Assignee, index: number) => (
            <div
              key={index}
              className="rounded-full bg-blue-500 text-white py-1 px-3 text-sm"
            >
              {assignee.name}
            </div>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: (props: CellContext<Task, unknown>) => {
      const tags: Tag[] = props.cell.row.original.tags as Tag[];
      return (
        <div className="flex flex-wrap gap-2">
          {tags && tags.map((tag: Tag, index: number) => (
            <div
              key={index}
              className="rounded-full border border-foreground px-3 py-1 text-sm">
              {tag.name}
            </div>
          ))}
        </div>
      );
    },
    filterFn: filterTags,
  }
];