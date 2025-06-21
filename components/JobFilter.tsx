"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const JobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const budget = formData.get('budget') as string;
    const deadline = formData.get('deadline') as string;
    const level = formData.get('level') as string;

    const params = new URLSearchParams(searchParams.toString());
    if (budget) {
      params.set('budget', budget);
    } else {
      params.delete('budget');
    }
    if (deadline && deadline !== 'all') {
      params.set('deadline', deadline);
    } else {
      params.delete('deadline');
    }
    if (level && level !== 'all') {
      params.set('level', level);
    } else {
      params.delete('level');
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg border mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-1">Budget</label>
          <Input
            id="budget"
            name="budget"
            type="text"
            placeholder="e.g., $25-35"
            defaultValue={searchParams.get('budget') ?? ''}
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium mb-1">Deadline</label>
          <Select name="deadline" defaultValue={searchParams.get('deadline') ?? 'all'}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Deadline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="soon">Ending Soon</SelectItem>
              <SelectItem value="new">Newly Posted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="level" className="block text-sm font-medium mb-1">Level</label>
          <Select name="level" defaultValue={searchParams.get('level') ?? 'all'}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Pre-Intermediate">Pre-Intermediate</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Upper-Intermediate">Upper-Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Apply Filters</Button>
      </div>
    </form>
  );
};

export default JobFilter;
