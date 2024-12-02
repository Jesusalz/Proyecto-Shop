import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UsersList, UserFilters } from "@/components/features/users";
import { Button, Card } from "@/components/common";

const UsersPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {isFiltersOpen && (
          <div className="lg:col-span-1">
            <Card>
              <UserFilters />
            </Card>
          </div>
        )}
        <div className={isFiltersOpen ? "lg:col-span-3" : "lg:col-span-4"}>
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
